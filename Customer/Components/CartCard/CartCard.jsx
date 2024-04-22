import "./CartCard.css";
import Card from "react-bootstrap/Card";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { useEffect, useState } from "react";

const CartCard = ({ cartItemId, userId, updateCart, fetchQuantityChange }) => {
  const [productDetails, setProductDetails] = useState({});
  const [productID, setproductID] = useState(null);

  const [IndividualProductCount, setIndividualProductCount] = useState(1);

  useEffect(() => {
    if (cartItemId) {
      axios
        .get(
          `http://localhost:8080/CartItem/findProductIdByCartItemId/${cartItemId}`
        )
        .then((response) => {
          if (response.status === 200) {
            setproductID(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    axios
      .get(
        `http://localhost:8080/CartItem/findQuantityByCartItemId/${cartItemId}`
      )
      .then((response) => {
        if (response.status === 200) {
          setIndividualProductCount(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cartItemId, userId]);

  useEffect(() => {
    if (productID) {
      axios
        .get(`http://localhost:8080/Product/getProductById/${productID}`)
        .then((response) => {
          if (response.status === 200) {
            setProductDetails(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [productID]);

  const handleDeleteByUIDandCID = () => {
    const url = `http://localhost:8080/CartItem/removeItemFromCartbyUIDandCID/${userId}/${cartItemId}`;

    axios
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          alert("Item Deleted -> " + productDetails.productName);

          updateCart(cartItemId);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddItem = () => {
    setIndividualProductCount((preVal) => preVal + 1);
  };

  // Error
  useEffect(() => {
    if (userId && productID !== null) {
      const url = `http://localhost:8080/CartItem/updateCount/${userId}/${productID}/${IndividualProductCount}`;

      axios
        .put(url)
        .then((response) => {
          if (response.status === 200) {
            fetchQuantityChange(IndividualProductCount);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [
    IndividualProductCount,
    fetchQuantityChange,
    productDetails,
    productID,
    userId,
  ]);

  const handleSubtractItem = () => {
    setIndividualProductCount((preVal) => preVal - 1);
  };

  return (
    <Card className="card-card">
      <div className="card-container">
        <div className="card-image">
          <img
            className="card-image-box"
            src={productDetails.imageLink}
            alt=""
          />
        </div>
        <div className="card-details">
          <div className="card-detailsbox">
            <div className="card-details-title">
              {productDetails.productName}
            </div>
            <div className="card-details-desc">
              {productDetails.description}
            </div>
            <div
              className="card-details-size"
              style={{ opacity: "60%", fontWeight: "bold" }}
            >
              Size : M
            </div>
            <div>Color : {productDetails.color}</div>
          </div>
          {/* 


 */}

          <div className="card-details-func">
            {IndividualProductCount === 1 ? (
              <button
                className="btn  deleteitembtn"
                onClick={() => {
                  handleDeleteByUIDandCID();
                }}
              >
                <DeleteForeverIcon />
              </button>
            ) : (
              <button
                className="btn btn-outline-danger addbtn"
                onClick={() => {
                  handleSubtractItem();
                }}
                style={{ fontSize: "100%" }}
              >
                -
              </button>
            )}

            <span className="px-3 quantitycount">{IndividualProductCount}</span>

            <button
              className="btn btn-outline-success addbtn"
              onClick={() => {
                handleAddItem();
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* 



         */}

        <div className="card-price">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              fontFamily: "monospace",
            }}
          >
            ₹{" "}
            {(
              productDetails.price *
              (1 - productDetails.discount / 100)
            ).toFixed(2)}
          </div>
          {IndividualProductCount !== 1 && (
            <button
              className="btn btn-danger deleteitembtn mt-5"
              onClick={() => {
                handleDeleteByUIDandCID();
              }}
            >
              <DeleteForeverIcon />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CartCard;
