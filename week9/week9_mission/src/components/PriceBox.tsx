import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { openModal } from '../slices/modalSlice';

const PriceBox = (): Element => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = (): void => {
    dispatch(openModal()); // ✅ 이제 모달이 뜨도록
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleInitializeCart}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
