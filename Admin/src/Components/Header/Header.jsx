import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [sidetoggle, setSideToggle] = useState(false)

  const handletoggleBtn = () => {
    setSideToggle(!sidetoggle)
  }

  const logout = () => {
    localStorage.clear()
  }

  const isActive = (path) => location.pathname.startsWith(path);
  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <h2>Ved Lakshna Admin Panel</h2>
            <div className="bar" onClick={handletoggleBtn}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="" target="_blank">
              <i class="fa-solid fa-globe"></i>
              Go To Website
            </a>

            <div className="logout" onClick={logout}>
              Log Out <i class="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>

        </div>

        <div className={`rightNav ${sidetoggle ? "active" : ""} `}>
          <ul>
            <li className={isActive('/dashboard') ? 'active' : ''}><Link to="/dashboard" onClick={handletoggleBtn}> <i class="fa-solid fa-chart-line"></i> Dashboard</Link></li>
            <li className={isActive('/all-orders') || isActive("/edit-order") ? 'active' : ''} ><Link to="/all-orders" onClick={handletoggleBtn}> <i class="fa-solid fa-cart-shopping"></i> Manage Orders</Link></li>
            <li className={isActive('/all-banners') || isActive("/add-banner") || isActive("/edit-banner") ? 'active' : ''} ><Link to="/all-banners" onClick={handletoggleBtn}> <i class="fa-regular fa-images"></i> Manage Banners</Link></li>
            <li className={isActive('/all-category') || isActive("/add-category") || isActive("/edit-category") ? 'active' : ''} ><Link to="/all-category" onClick={handletoggleBtn}> <i class="fa-solid fa-list"></i> Manage Category</Link></li>
            {/* <li><Link to="/all-subcategory" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage SubCategory</Link></li> */}
            <li className={isActive('/all-products') || isActive("/add-product") || isActive("/edit-produc") ? 'active' : ''} ><Link to="/all-products" onClick={handletoggleBtn}> <i class="fa-solid fa-box"></i> Manage Product</Link></li>
            <li className={isActive('/all-pincodes') || isActive("/add-pincode") || isActive("/edit-pincode") ? 'active' : ''}><Link to="/all-pincodes" onClick={handletoggleBtn}> <i class="fa-solid fa-location-dot"></i> Manage Pincode</Link></li>
            <li className={isActive('/all-users') ? 'active' : ''} ><Link to="/all-users" onClick={handletoggleBtn}> <i class="fa-solid fa-users"></i> All Users</Link></li>

            <button className='logout mb-5'>Log Out <i class="fa-solid fa-right-from-bracket"></i></button>

          </ul>
        </div>

      </header>
    </>
  )
}

export default Header