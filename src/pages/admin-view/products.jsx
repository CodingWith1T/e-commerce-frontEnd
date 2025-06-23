import { Button } from '@/components/ui/button'
import { Fragment, useEffect, useState } from 'react'
import CommonForm from '@/components/common/form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import ProductImageUpload from '@/components/admin-view/image-upload';
import { addProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/product-slice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner"
import AdminProductTile from './product-tile';

const initalFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}

const AdminProducts = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initalFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector(state => state.adminProducuts)
  const dispatch = useDispatch();


  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null ?
      dispatch(editProduct({
        id: currentEditedId, formData
      })).then((data) => {
        console.log(data, 'edit');
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setFormData(initalFormData)
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null);
        }
      })
      :
      dispatch(addProduct({
        ...formData,
        image: uploadedImageURL
      })).then((data) => {
        console.log(data);
        if (data?.payload.success) {
          dispatch(fetchAllProducts())
          setOpenCreateProductsDialog(false)
          setImageFile(null)
          setFormData(initalFormData)
          toast("Product add successfully")
        }
      })
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
      }
    })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map(key => formData[key] !== '')
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch])

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)} >
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
            productList.map(productItem =>
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />) : null
        }
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => { setOpenCreateProductsDialog(false); setCurrentEditedId(null); setFormData(initalFormData); }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? 'Edit Product' : " Add New Product "}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setUploadedImageURL={setUploadedImageURL}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="p-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? 'Edit' : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts