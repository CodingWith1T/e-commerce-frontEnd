import ProductImageUpload from '@/components/admin-view/image-upload';
import { Button } from '@/components/ui/button';
import { addFeatureImages, getFeatureImages } from '@/store/common-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {

  const { featureImageList } = useSelector(state => state.commonFeature);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImages(uploadedImageURL)).then(data => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages())
        setImageFile(null)
        setUploadedImageURL("")
      }
    })
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch])

  return (
    <div className='p-6'>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageURL={uploadedImageURL}
        setUploadedImageURL={setUploadedImageURL}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      // isEditMode={currentEditedId !== null}
      />
      <Button onClick={() => handleUploadFeatureImage()} className="mt-5 w-full">Upload</Button>
      <div className='flex flex-col gap-4 mt-5'>
        {
          featureImageList && featureImageList.length > 0 ?
            featureImageList.map(featureImgItem => (
              <div className="relative">
                <img src={featureImgItem.image} className='w-full h-[300px] obejct-cover rounded-t-lg' />
              </div>
            )) : null
        }
      </div>
    </div>
  )
}

export default AdminDashboard