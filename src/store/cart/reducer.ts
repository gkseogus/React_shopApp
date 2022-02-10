import { Reducer } from "redux";
import { CartActionTypes, cartState } from "./types";

// redux는 항상 초기상태를 정의한다.
export const initialState: cartState = {
  data: {
    id: [], // 장바구니에 추가된 data를 배열로 받는다.
    items: [] 
  },
  errors: undefined,
  loading: false,
};

const reducer: Reducer<cartState> = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.FETCH_CART_REQUEST: { 
      return { ...state, loading: true };
    }
    case CartActionTypes.FETCH_CART_SUCCESS: { 
      return { ...state, loading: false, data: action.payload };
    }
    case CartActionTypes.FETCH_CART_ERROR: { 
      return { ...state, loading: false, errors: action.payload };
    }
    case CartActionTypes.ADD_TO_CART: { // 장바구니에 제품 추가
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          // data의 id도 같이 배열로 받음
          // item만 배열로 받아 store에 저장한다
          id: [...state.data.items, action.payload],
          items: [...state.data.items, action.payload]
        }
      };
    }
    // 모든 장바구니의 제품 제거
    case CartActionTypes.REMOVEALL_FROM_CART: { 
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          id: state.data.id.filter(idd => idd === action.payload),
          items: state.data.items.filter(itemm => itemm === action.payload)
        }
      };
    }
    // 개별 장바구니의 제품 제거
    case CartActionTypes.REMOVE_FROM_ITEM: {
      return {
        errors: state.errors,
        loading: state.loading,
        data:{
          ...state.data,
          id: state.data.id.filter(idd => idd === action.payload),
          items: state.data.items.filter(items => items !== action.payload.id)
        }
      }
    }
    default: {
      return state;
    }
  }
};

export { reducer as cartReducer };
