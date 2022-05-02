import { FormikErrors, FormikTouched } from "formik";
import { IAddress } from "../../models";
import { StyledField } from ".";

interface IAddressFormProps<T> {
  errors: FormikErrors<T> | undefined
  touched: FormikTouched<T> | undefined
}

const AddressForm = <T extends IAddress>({ errors, touched }: IAddressFormProps<T>) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2">
        <StyledField name="address.firstLine" label="Address Line 1" errors={errors?.firstLine} touched={touched?.firstLine} />
        <StyledField name="address.secondLine" label="Address Line 2" errors={errors?.secondLine} touched={touched?.secondLine} />
        <StyledField name="address.thirdLine" label="Address Line 3" errors={errors?.thirdLine} touched={touched?.thirdLine} />
      </div>
      <div className="flex flex-1 md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0">
        <div className="md:max-w-1/5">
          <StyledField autoComplete="false" name="address.city" label="City" errors={errors?.city} touched={touched?.city} />
        </div>
        <div className="relative">
          <StyledField name="address.country" label="Country" errors={errors?.country} touched={touched?.country} />
        </div>
        <StyledField name="address.postCode" label="Post Code" errors={errors?.postCode} touched={touched?.postCode} />
      </div>
    </div>
  )
}

export default AddressForm;