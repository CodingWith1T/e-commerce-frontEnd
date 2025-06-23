export const registerFormControls = [
    {
        name: "userName",
        label: "User Name",
        placeholder: "Enter your user name",
        componentType: 'input',
        type: 'text'
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: 'input',
        type: 'email'
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: 'input',
        type: 'password'
    },

]

export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: 'input',
        type: 'email'
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: 'input',
        type: 'password'
    },
]

export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title"
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description"
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
            { id: "sportswear", label: "Sportswear" },
            { id: "formal", label: "Formal" },
            { id: "casual", label: "Casual" },
            { id: "winterwear", label: "Winterwear" },
            { id: "ethnic", label: "Ethnic Wear" }
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "armani", label: "ARMANI EXCHANGE" },      
            { id: "adidas", label: "Adidas" },
            { id: "zara", label: "Zara" },
            { id: "levi", label: "Levi's" },
            { id: "puma", label: "Puma" },
            { id: "h&m", label: "H&M" },
            { id: "uniqlo", label: "Uniqlo" },
            { id: "underarmour", label: "Under Armour" },
            { id: "reebok", label: "Reebok" },
            { id: "gucci", label: "Gucci" },
            { id: "prada", label: "Prada" }
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price"
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)"
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock"
    },
]

export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shop/listing'
    },
    {
        id: 'women',
        label: 'Women',
        path: '/shop/listing'
    },
    {
        id: 'kids',
        label: 'Kids',
        path: '/shop/listing'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/listing'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/listing'
    },
]

export const categoryOptionsMap = {
    men: 'Men',
    women: 'Women',
    kids: 'Kids',
    accessories: 'Accessories',
    footwear: 'Footwear',
    sportswear: 'Sportswear',
    formal: 'Formal',
    casual: 'Casual',
    winterwear: 'Winterwear',
    ethnic: 'Ethnic Wear',
}

export const brandOptionsMap = {
    nike: 'Nike',
    armani: 'ARMANI EXCHANGE',
    adidas: 'Adidas',
    zara: 'Zara',
    levi: "Levi's",
    puma: 'Puma',
    'h&m': 'H&M',
    uniqlo: 'Uniqlo',
    underarmour: 'Under Armour',
    reebok: 'Reebok',
    gucci: 'Gucci',
    prada: 'Prada',
};

export const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
        { id: "sportswear", label: "Sportswear" },
        { id: "formal", label: "Formal" },
        { id: "casual", label: "Casual" },
        { id: "winterwear", label: "Winterwear" },
        { id: "ethnic", label: "Ethnic Wear" }
    ],
    brand: [
        { id: "nike", label: "Nike" },
        { id: "armani", label: "ARMANI EXCHANGE" },
        { id: "adidas", label: "Adidas" },
        { id: "zara", label: "Zara" },
        { id: "levi", label: "Levi's" },
        { id: "puma", label: "Puma" },
        { id: "h&m", label: "H&M" },
        { id: "uniqlo", label: "Uniqlo" },
        { id: "underarmour", label: "Under Armour" },
        { id: "reebok", label: "Reebok" },
        { id: "gucci", label: "Gucci" },
        { id: "prada", label: "Prada" }
    ]
}

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price : Low to High" },
    { id: "price-hightolow", label: "Price : High to Low" },
    { id: "title-atoz", label: "Title : A to Z" },
    { id: "title-ztoa", label: "Title : Z to A" },
]


export const addressFormControls = [
    {
        label : "Address",
        name : "address",
        componentType : "input",
        type : "text",
        placeholder : "Enter your address",
    },
    {
        label : "City",
        name : "city",
        componentType : "input",
        type : "text",
        placeholder : "Enter your city",
    },
    {
        label : "Pincode",
        name : "pincode",
        componentType : "input",
        type : "text",
        placeholder : "Enter your pincode",
    },
    {
        label : "Phone",
        name : "phone",
        componentType : "input",
        type : "text",
        placeholder : "Enter your phone",
    },
    {
        label : "Notes",
        name : "notes",
        componentType : "input",
        type : "text",
        placeholder : "Enter your notes",
    },
]