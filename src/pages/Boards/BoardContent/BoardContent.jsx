import {Box} from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import {mapOrder} from "~/utils/sorts";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision,
} from "@dnd-kit/core";
import {useEffect, useState, useCallback, useRef} from "react";
import {arrayMove} from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import {cloneDeep, isEmpty} from "lodash";
// import {generatePlaceholderCard} from "~/utils/formatters";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({board}) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null);

  // Điểm va chạm cuối cùng trước đó (thuật toán phát hiện va chạm)
  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  // Tim 1 column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  // Cập nhập lại state trong trường hợp di chuyển card giữa 2 column khác nhau
  const moveCardBetweenDifferentColumn = (
    overCardId,
    overColumn,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );

      // logic tinh toan cardindex moi
      let newCardIndex;

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);

      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      // column cu
      if (nextActiveColumn) {
        // xoa card ở các column active
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Thêm Placeholder vào card rông
        // if (isEmpty(nextActiveColumn.cards)) {
        //   console.log("aaaafirst");
        //   nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        // }

        // cập nhập lại mang ở cardOrderId
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }

      // column moi
      if (nextOverColumn) {
        // kiểm tra xem card đang kéo có tồn tại ở overColumn ko,có thì xoa trưoc
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        // Thêm card đang kéo vào vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        // Xóa Placeholder của card 
        // nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // Cập nhập lại mảng cardOrderId
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      return nextColumns;
    });
  };

  const handleDragStart = (e) => {
    // console.log("handleDragStart", e);
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e?.active?.data?.current);

    if (e?.active?.data?.current?.columnId) {
      setOldColumnDraggingCard(findColumnByCardId(e?.active?.id));
    }
  };

  // console.log("activeDragItemId", activeDragItemId)
  // console.log("activeDragItemType", activeDragItemType)
  // console.log("activeDragItemData", activeDragItemData)

  const handleDragOver = (e) => {
    // console.log("handleDragOver: ", e);
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const {active, over} = e;
    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: {current: activeDraggingCardData},
    } = active;
    const {id: overCardId} = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumn(
        overCardId,
        overColumn,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (e) => {
    const {active, over} = e;

    if (!active || !over) return;

    // xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: {current: activeDraggingCardData},
      } = active;
      const {id: overCardId} = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);
      // console.log("activeColumn", activeColumn);
      // console.log("overColumn", overColumn);

      if (!activeColumn || !overColumn) return;

      if (oldColumnDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumn(
          overCardId,
          overColumn,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        // lay gia tri index cu
        const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );

        // lay gia tri index moi
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );

        const dndOrderedCard = arrayMove(
          oldColumnDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        setOrderColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          targetColumn.cards = dndOrderedCard;
          targetColumn.cardOrderIds = dndOrderedCard.map((card) => card._id);

          return nextColumns;
        });
      }
    }

    // xử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // lay gia tri index cu
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        );

        // lay gia tri index moi
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        );

        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );
        // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
        // console.log("dndOrderedColumns", dndOrderedColumns);
        // console.log("dndOrderedColumnsIds", dndOrderedColumnsIds);

        setOrderColumns(dndOrderedColumns);
      }
    }

    // Những giá trij sau khi kéo tha luôn phải đưa về giá trị mặc định ban đầu
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnDraggingCard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5,
        },
      },
    }),
  };

  // args = argument = các đối số, tham số
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemData === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({...args});
      }

      const pointerIntersections = pointerWithin(args);

      if (!pointerIntersections?.length) return;

      // // Thuật toán phát hiện va chạm sẽ trả về 1 mảng các va chạm ở đây
      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args);

      // Tìm ra overId đầu tiên trong đám intersections
      let overId = getFirstCollision(pointerIntersections, "id");

      if (overId) {
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        );
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{id: overId}];
      }

      return lastOverId.current ? [{id: lastOverId.current}] : [];
    },
    [activeDragItemData, orderedColumns]
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => `${theme.trello.boardContentHeight}`,
          display: "flex",
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />

        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}

          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}

          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
