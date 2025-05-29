import { useCartInfo } from '../hooks/useCartStore';
import { useDispatch } from 'react-redux';
import { openModal } from '../slices/modalSlice';

const PriceBox = (): JSX.Element => {
  const { total } = useCartInfo();
  const dispatch = useDispatch();

  const handleInitializeCart = (): void => {
    dispatch(openModal()); // 모달만 열고, 삭제는 모달 내부 버튼에서 처리
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
