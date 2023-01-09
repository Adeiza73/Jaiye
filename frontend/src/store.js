import {
        legacy_createStore as createStore,
        combineReducers,
        applyMiddleware,
      } from 'redux'
      import thunk from 'redux-thunk'
      import { composeWithDevTools } from '@redux-devtools/extension'
      import {
        episodeListReducer,
        episodeTopRatedReducer,
        episodeDetailsReducer,
        episodeDeleteReducer,
        episodeCreateReducer,
        episodeUpdateReducer,
        episodeReviewCreateReducer,
      } from './reducers/episodeReducers'
      import { cartReducer } from './reducers/cartReducers'
      import {
        userDetailsReducer,
        userLoginReducer,
        userRegisterReducer,
        userUpdateProfileReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer,
      } from './reducers/userReducers'
      import {
        orderCreateReducer,
        orderDetailsReducer,
        orderPayReducer,
        orderListMyReducer,
        orderListReducer,
        orderDeliverReducer,
      } from './reducers/orderReducers'
      
      const reducer = combineReducers({
        episodeList: episodeListReducer,
        episodeTopRated: episodeTopRatedReducer,
        episodeDetails: episodeDetailsReducer,
        episodeDelete: episodeDeleteReducer,
        episodeCreate: episodeCreateReducer,
        episodeUpdate: episodeUpdateReducer,
        episodeReviewCreate: episodeReviewCreateReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderDeliver: orderDeliverReducer,
        orderListMy: orderListMyReducer,
        orderList: orderListReducer,
      })
      
      const cartItemsFromStorage = localStorage.cartItems
        ? JSON.parse(localStorage.cartItems)
        : []
      
      const userInfoFromStorage = localStorage.userInfo
        ? JSON.parse(localStorage.userInfo)
        : null
      
      const shippingAddressFromStorage = localStorage.shippingAddress
        ? JSON.parse(localStorage.shippingAddress)
        : {}
      
      const initialState = {
        cart: {
          cartItems: cartItemsFromStorage,
          shippingAddress: shippingAddressFromStorage,
        },
        userLogin: { userInfo: userInfoFromStorage },
      }
      
      const middleware = [thunk]
      
      const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
      )
      
      export default store