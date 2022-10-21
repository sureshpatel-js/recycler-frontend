import "./Body.css";
const Body = (props) => {
    const { shopsArray } = props;
    return (
        <div className="bodyContainer" >
            <div className="shopScrollBox" >
                {
                    shopsArray.length > 0 && shopsArray.map(shop => {
                        return (
                            <div className="shopCard"
                                onClick={() => props.toggleProductsContainer(shop._id)}
                            >
                                <div className="shopImg" >
                                    <img src="https://lh5.googleusercontent.com/p/AF1QipPfWGzLlF6wL7AeqNvftLKBn_czxeYkDXaE-qs1=w112-h112-n-k-no" alt="image" ></img>
                                </div>
                                <div className="shopDetail" >
                                    <h3>{shop.shop_name}</h3>
                                    <h6>{shop.phone_number}</h6>
                                    <h6>{shop.address_line_one}, {shop.address_line_two}, {shop.address_line_three}</h6>
                                    <h6>Pincode: {shop.address_line_four}</h6>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Body;