import React from 'react'

const ShoppingProductTile = ({ product, handleProductDetails, handleAddtoCart }) => {
    return (
        <div>
            {/* <Card className="w-full max-w-sm mx-auto">
                <div onClick={() => handleProductDetails(product?._id)}>
                    <div className='relative'>
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className='w-full h-[300px] object-cover rounded-t-lg'
                        />
                        {
                            product?.salePrice > 0 ?
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>
                                : null
                        }
                    </div>
                    <CardContent className="p-4">
                        <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                        <div className='flex justify-between items-center mb-2'>
                            <span className='text-[16px] text-muted-foreground'>
                                {categoryOptionsMap[product?.category]}
                            </span>
                            <span className='text-[16px] text-muted-foreground'>
                                {brandOptionsMap[product?.brand]}
                            </span>
                        </div>
                        <div className='flex justify-between items-center mb-2'>
                            <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>{product?.price}</span>
                            {
                                product?.salePrice > 0 ?
                                    <span className='text-lg font-semibold text-primary'>
                                        {product?.salePrice}
                                    </span>
                                    : null
                            }
                        </div>
                    </CardContent>

                </div>
                <CardFooter>
                    <Button onClick={() => handleAddtoCart(product?._id)} className="w-full">Add to cart</Button>
                </CardFooter>
            </Card> */}

            <div className='my-5'>
                <div className='overflow-hidden'>
                    <img onClick={() => handleProductDetails(product?._id)} src={product?.image} alt={product?.title} className='hover:scale-110 h-[300px] object-cover w-full transition ease-in-out' />
                </div>
                <p className='pt-3 pb-1 text-sm'>{product?.title}</p>
                <div className='flex justify-between'>
                    <p className={`${product?.salePrice > 0 ? 'line-through' : ''} text-sm font-medium text-primary`}>Rs.{product?.price}</p>
                    {
                        product?.salePrice > 0 ?
                            <p className={`text-sm font-medium`}>Rs.{product?.salePrice}</p> : null
                    }
                </div>
            </div>
        </div>

    )
}

export default ShoppingProductTile