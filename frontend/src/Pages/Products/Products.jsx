import React, { useEffect, useState } from "react";
import "./product.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWeights, setSelectedWeights] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.panchgavyamrit.com/api/all-category");
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);

        // Automatically select the first category
        if (fetchedCategories.length > 0) {
          const firstCategory = fetchedCategories[0];
          setSelectedCategory(firstCategory._id);
          fetchProducts(firstCategory._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId) => {
    try {
      const response = await axios.get("https://api.panchgavyamrit.com/api/get-product");
      const filteredProducts = response.data.products.filter(
        (product) => product.categoryName._id === categoryId
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const handleWeightChange = (productId, productWeight) => {
    const selectedProduct = products.find((product) => product._id === productId);
    const productInfo = selectedProduct?.productInfo.find(
      (info) => info.productweight === productWeight
    );

    if (productInfo) {
      setSelectedWeights((prev) => ({
        ...prev,
        [productId]: {
          weight: productWeight,
          price: productInfo.productFinalPrice,
          originalPrice: productInfo.productPrice,
          discountPercentage: productInfo.productDiscountPercentage,
          stock: productInfo.stock,
        },
      }));
    }
  };

  const handleViewDetails = (productId) => {
    if (!selectedWeights[productId]) {
      Swal.fire({
        icon: "error",
        title: "Weight Not Selected",
        text: "Please select a weight before viewing details.",
      });
      return;
    }
    // Navigate to product details page with the selected weight and price
    navigate(
      `/product/product-details/${productId}?weight=${selectedWeights[productId].weight}&price=${selectedWeights[productId].price}&stock=${selectedWeights[productId].stock}`
    );
  };

  return (
    <>
      <Helmet>
        <title>Products - Medicinal Ghee, Agarbatthi, and More</title>
        <meta
          name="description"
          content="Explore our wide range of products including Ghee, Agarbatthi, and other medicinal products. Shop now for the best prices and quality."
        />
      </Helmet>
      <section className="productsPage">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 productSidebar">
              <h4>Categories</h4>
              <hr />
              <ul className="category-list">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    className={
                      selectedCategory === category._id ? "active-category" : ""
                    }
                    onClick={() => handleCategoryChange(category._id)}
                  >
                    {category.categoryName}
                  </li>
                ))}
              </ul>
            </div>

            {/* All Products */}
            <div className="col-md-9 all-products product-top-spacing">
              <div className="row">
                {products.map((product) => (
                  <div key={product._id} className="col-md-4 col-6 pruduct-spacing">
                    <div className="product-card-page">
                      <div className="product-image-product">
                        <img
                          src={product.productImage[0]}
                          alt={product.productName}
                          className="img-fluid"
                        />
                      </div>
                      <div className="productName">
                        <h3 className="product-title">{product.productName}</h3>
                        <div className="price">
                          <span className="current-price">
                            <del> &#8377;
                              {selectedWeights[product._id]?.originalPrice ||
                                product.productInfo[0].productPrice}</del>
                          </span> <br />
                          <span className="current-price text-danger">
                            Off {selectedWeights[product._id]?.discountPercentage ||
                              product.productInfo[0].productDiscountPrice} %
                          </span> <br />
                          <span className="current-price">
                            &#8377;
                            {selectedWeights[product._id]?.price ||
                              product.productInfo[0].productFinalPrice}
                          </span>
                        </div>
                      </div>
                      <label
                        htmlFor={`pot-${product._id}`}
                        className="pot-label"
                      >
                        *Weight:
                      </label>
                      <select
                        id={`pot-${product._id}`}
                        className="pot-select"
                        onChange={(e) =>
                          handleWeightChange(product._id, e.target.value)
                        }
                        defaultValue=""
                      >
                        <option value="" disabled>
                          --- Please Select ---
                        </option>
                        {product.productInfo.map((info) => (
                          <option
                            key={info.productweight}
                            value={info.productweight}
                          >
                            {info.productweight}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleViewDetails(product._id)}
                        className="add-to-cart"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
