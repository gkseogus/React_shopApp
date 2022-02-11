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
          id: state.data.id.filter(idd => {
            // idd(state.data.id), action.payload 값이 서로 다르므로 filter 조건은 false
            // state.data.id 객체는 모두 필터됨
            return idd.id === action.payload
            }
          ),
          items: state.data.items.filter(itemm => {
            return itemm.id === action.payload
            }
          )
        }
      };
    }
    // 개별 장바구니의 제품 제거
    case CartActionTypes.REMOVE_FROM_ITEM: {
      console.log('REMOVE_FROM_ITEMAction',action.payload)
      return {
        errors: state.errors,
        loading: state.loading,
        data:{
          ...state.data,
          // eslint-disable-next-line array-callback-return
          id: state.data.id.filter(idd => {
            // console.log('idd.id',idd.id)
            // console.log('action.payload',action.payload)
            // console.log('action.payload.id',action.payload[0].id)
            // console.log('state.data.id',state.data.id)

            for(let i=0; i<state.data.id.length; i++){
              // 이게 거짓이므로 filter는 해당 id 값을 가진 요소를 배열에서 삭제
              if(idd.id === action.payload[i].id){
                console.log('ddd',action.payload[i].id)
                return idd.id !== action.payload[i].id 
              }
              else{
                console.log('ddd2',action.payload[i].id)
                return idd.id !== action.payload[i].id 
              }
            }
            // 현재 0번째 위치한 id 값을 가진 데이터만 제외하고 나머지 값만 배열에서 삭제한다.
            return idd.id === action.payload[0].id 
            }
          ),

          // eslint-disable-next-line array-callback-return
          items: state.data.id.filter(itemm => {
            for(let i=0; i<state.data.id.length; i++){
              if(itemm.id === action.payload[i].id ){
                console.log('ttt',action.payload[i].id)
                return itemm.id !== action.payload[i].id 
              }
              else{
                console.log('ttt2',action.payload[i].id)
                return itemm.id !== action.payload[i].id 
              }
            }
            }
          )
        }
      }
    }
    
    default: {
      return state;
    }
  }
};


export { reducer as cartReducer };
