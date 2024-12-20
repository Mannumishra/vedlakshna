import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'
import AddCategory from '../../Pages/Category/AddCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AllProduct from '../../Pages/Products/AllProduct'
import AddProduct from '../../Pages/Products/AddProduct'
import AllBanner from '../../Pages/Banners/AllBanner'
import AddBanner from '../../Pages/Banners/AddBanner'
import EditBanner from '../../Pages/Banners/EditBanner'
import AllShopBanner from '../../Pages/ShopBanner/AllShopBanner'
import AddShopBanner from '../../Pages/ShopBanner/AddShopBanner'
import EditShopBanner from '../../Pages/ShopBanner/EditShopBanner'
import AllVoucher from '../../Pages/Vouchers/AllVoucher'
import CreateVoucher from '../../Pages/Vouchers/AddVoucher'
import AllOrder from '../../Pages/Orders/AllOrder'
import EditOrder from '../../Pages/Orders/EditOrder'
import AllUsers from '../../Pages/Users/AllUsers'
import AllSubCategory from '../../Pages/SubCategory/AllSubCategory'
import AddSubCategory from '../../Pages/SubCategory/AddSubCategory'
import EditSubCategory from '../../Pages/SubCategory/EditSubCategory'
import EditProduct from '../../Pages/Products/EditProduct'
import Login from '../auth/Login'
import AllPincode from '../../Pages/PinCode/AllPincode'
import AddPincode from '../../Pages/PinCode/AddPincode'
import EditPincode from '../../Pages/PinCode/EditPincode'

const Home = () => {
  const loginValue = localStorage.getItem("login")
  return (
    <>
      {
        loginValue ? <>

          <Header />
          <div className="rightside">
            <Routes>
              <Route path={"/dashboard"} element={<Dashboard />} />

              {/* Category --  */}
              <Route path={"/all-category"} element={<AllCategory />} />
              <Route path={"/add-category"} element={<AddCategory />} />
              <Route path={"/edit-category/:id"} element={<EditCategory />} />

              {/* SubCategory --  */}
              <Route path={"/all-subcategory"} element={<AllSubCategory />} />
              <Route path={"/add-subcategory"} element={<AddSubCategory />} />
              <Route path={"/edit-subcategory/:id"} element={<EditSubCategory />} />

              {/* Product --  */}
              <Route path={"/all-products"} element={<AllProduct />} />
              <Route path={"/add-product"} element={<AddProduct />} />
              <Route path={"/edit-product/:id"} element={<EditProduct />} />


              {/* --- Orders --- */}
              <Route path={"/all-users"} element={<AllUsers />} />

              {/* --- Vouchers --- */}
              <Route path={"/all-voucher"} element={<AllVoucher />} />   {/* // All Vouchers */}
              <Route path={"/add-voucher"} element={<CreateVoucher />} />

              {/* --- Tags --- */}
              <Route path={"/all-pincodes"} element={<AllPincode />} />
              <Route path={"/add-pincode"} element={<AddPincode />} />
              <Route path={"/edit-pincode/:id"} element={<EditPincode />} />

              {/* --- Banners --- */}
              <Route path={"/all-banners"} element={<AllBanner />} />
              <Route path={"/add-banner"} element={<AddBanner />} />
              <Route path={"/edit-banner/:id"} element={<EditBanner />} />

              {/* --- Banners --- */}
              <Route path={"/all-shop-banners"} element={<AllShopBanner />} />
              <Route path={"/add-shop-banner"} element={<AddShopBanner />} />
              <Route path={"/edit-shop-banner/:id"} element={<EditShopBanner />} />

              {/* --- Orders --- */}
              <Route path={"/all-orders"} element={<AllOrder />} />
              <Route path={"/edit-order/:orderId"} element={<EditOrder />} />





              {/* all-shop */}

            </Routes>
          </div>

        </> :
          <Login />
      }
    </>
  )
}

export default Home