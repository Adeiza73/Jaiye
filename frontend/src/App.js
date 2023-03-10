import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Header2 from './components/Header2'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import EpisodeScreen from './screens/EpisodeScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import  RegisterScreen from './screens/RegisterScreen'
import  ProfileScreen from './screens/ProfileScreen'
import  ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import EpisodeListScreen from './screens/EpisodeListScreen'
import EpisodeEditScreen from './screens/EpisodeEditScreen'
import OrderListScreen from './screens/OrderListScreen'




 


const App = () => {
  return(
    <Router>
      <Header /> 
       
      <main className='py-3' >
      <Container>
         <Routes> 
          <Route path='/' element={ <HomeScreen /> } exact />
          <Route path='/episode/:id' element={ <EpisodeScreen />} />
          <Route path='/cart'>
              <Route index element={<CartScreen />} />
              <Route path=':id' element={<CartScreen />} />
            </Route>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentMethodScreen />} />
            <Route path='/placeOrder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/admin/userList' element={<UserListScreen />} />
            <Route path='/admin/user/:userId/edit' element={<UserEditScreen />} />
            <Route path='/admin/episodeList' element={<EpisodeListScreen />} />
            <Route path='/admin/episode/:episodeId/edit' element={<EpisodeEditScreen />} />
            <Route path='/admin/orderList' element={<OrderListScreen />} />
          </Routes>
      </Container>
      </main>
      <Footer />
    </Router>
  )
}
export default App