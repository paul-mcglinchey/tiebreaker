import { FormikErrors, FormikTouched } from "formik";
import { IAddress, IHasAddress } from "../../../models";
import StyledField from "./StyledField";

interface IAddressFormProps<T> {
  errors: FormikErrors<T>,
  touched: FormikTouched<T>
}

const AddressForm = <T extends IHasAddress>({ errors, touched }: IAddressFormProps<T>) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2">
        <StyledField name="address.firstLine" label="Address Line 1" errors={errors.address ? (errors.address as IAddress).firstLine : ''} touched={touched.address ? (touched.address as IAddress).firstLine : ''} />
        <StyledField name="address.secondLine" label="Address Line 2" errors={errors.address ? (errors.address as IAddress).secondLine : ''} touched={touched.address ? (touched.address as IAddress).secondLine : ''} />
        <StyledField name="address.thirdLine" label="Address Line 3" errors={errors.address ? (errors.address as IAddress).thirdLine : ''} touched={touched.address ? (touched.address as IAddress).thirdLine : ''} />
      </div>
      <div className="flex flex-1 md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0">
        <div className="md:max-w-1/5">
          <StyledField autoComplete="false" name="address.city" label="City" errors={errors.address ? (errors.address as IAddress).city : ''} touched={touched.address ? (touched.address as IAddress).city : ''} />
        </div>
        <div className="relative">
          <StyledField name="address.country" label="Country" errors={errors.address ? (errors.address as IAddress).country : ''} touched={touched.address ? (touched.address as IAddress).country : ''} />
        </div>
        <StyledField name="address.postCode" label="Post Code" errors={errors.address ? (errors.address as IAddress).postCode : ''} touched={touched.address ? (touched.address as IAddress).postCode : ''} />
      </div>
    </div>
  )
}

export default AddressForm;