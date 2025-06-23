import { Button } from "@/components/ui/button"
import bannerOne from "../../assets/banner-1.webp"
import bannerTwo from "../../assets/banner-2.webp"
import bannerThree from "../../assets/banner-3.jpg"
import {
  ShoppingBag,
  Baby,
  Watch,
  Footprints,
  Dumbbell,
  Briefcase,
  Smile,
  Snowflake,
  IndianRupee,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShirtIcon

} from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import { useNavigate } from "react-router-dom"
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice"
import { toast } from "sonner"
import ProductDetailsDailog from "@/components/shopping-view/product-details"
import { getFeatureImages } from "@/store/common-slice"


const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: ShoppingBag },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "accessories", label: "Accessories", icon: Watch },
  { id: "footwear", label: "Footwear", icon: Footprints },
  { id: "sportswear", label: "Sportswear", icon: Dumbbell },
  { id: "formal", label: "Formal", icon: Briefcase },
  { id: "casual", label: "Casual", icon: Smile },
  { id: "winterwear", label: "Winterwear", icon: Snowflake },
  { id: "ethnic", label: "Ethnic Wear", icon: IndianRupee }
]

const brand = [
  { id: "nike", label: "Nike", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { id: "armani", label: "ARMANI EXCHANGE", icon: "https://www.cdnlogo.com/logos/a/54/armani-exchange.svg" },
  { id: "adidas", label: "Adidas", icon: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { id: "zara", label: "Zara", icon: "https://static.cdnlogo.com/logos/z/18/zara.svg" },
  { id: "levi", label: "Levi's", icon: "https://static.cdnlogo.com/logos/l/38/levis.svg" },
  { id: "puma", label: "Puma", icon: "https://assets.turbologo.com/blog/en/2019/11/19084917/puma-logo-cover.png" },
  { id: "h&m", label: "H&M", icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
  { id: "uniqlo", label: "Uniqlo", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7JYMsy0iM38G23-F6-SdUDxyXglP9dNL0n8gOm7A-Et3lwj48hh2110nVsTnRGsVfMrc&usqp=CAU" },
  { id: "underarmour", label: "Under Armour", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScnoNGiCrr-Q4S6LVSOZhs8AtBKrIVTXLZ3kOhDSdUSuqzl-gnlMPzs1TI5Jx_MyKQOXw&usqp=CAU" },
  { id: "reebok", label: "Reebok", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhjml088U58MLNFjISEHQW5CsJc0RNKFf7hU2jl1Mdm1NCLSeZDQivdd8VAwhHglBc9bI&usqp=CAU" },
  { id: "gucci", label: "Gucci", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_tpXsj_fm4uuRI8Ypg3e57GODwCx-zC00A&s" },
  { id: "prada", label: "Prada", icon: "https://a.storyblok.com/f/182663/2000x1125/751af47e9c/prada_hero.png/m/3840x0/filters:quality(85)" }
];

const ShoppingHome = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(state => state.shopProducuts)
  const [openDetailsDailog, setOpenDetailsDailog] = useState(false);
  const { featureImageList } = useSelector(state => state.commonFeature);

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate('/shop/listing');
  }

  function handleProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(addToCart(
      { userId: user?.id, productId: getCurrentProductId, quantity: 1 })
    ).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchCartItem(user?.id));
        toast("Product is added to cart")
      }
    });
  }

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [featureImageList.length])

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
  }

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterspParams: {}, sortParams: "price-lowtohigh" }))
  }, [dispatch])

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDailog(true)
  }, [productDetails])


  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          featureImageList && featureImageList.length > 0 ? featureImageList.map((slides, index) => (
            <img
              src={slides?.image}
              key={index}
              alt={`Slide ${index}`}
              className={`absolute top-0 left-0 w-full h-full object-fit transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            />
          )) : null}
        <Button onClick={goToPrev} variant="outline" size="icon" className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 z-20">
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button onClick={goToNext} variant="outline" size="icon" className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 z-20">
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {
              categoriesWithIcon.map((categoryItem) => (
                <Card
                  onClick={() => handleNavigateToListingPage(categoryItem, 'category')}
                  className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {
              brand.map((brandItem) => (
                <Card onClick={() => handleNavigateToListingPage(brandItem, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img src={brandItem.icon} className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{brandItem.label}</span>
                  </CardContent>
                </Card>)
              )}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Features Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              productList && productList.length > 0 ?
                productList.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                    handleProductDetails={handleProductDetails}
                  />
                )) : null
            }
          </div>
        </div>
      </section>
      <ProductDetailsDailog open={openDetailsDailog} setOpen={setOpenDetailsDailog} productDetails={productDetails} />
    </div>
  )
}

export default ShoppingHome