import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfoToStore } from "../../redux/slices/cartSlices";
import { Country, State } from "country-state-city";
import { notifyError } from "../../toast";
import CheckoutSteps from "./CheckoutSteps";
import {
  PinDrop as PinDropIcon,
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  Public as PublicIcon,
  Phone as PhoneIcon,
  TransferWithinAStation as TransferWithinAStationIcon,
  LocalGasStation,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  console.log(shippingInfo)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: shippingInfo.country,
      pinCode: shippingInfo.pinCode,
      phoneNo: shippingInfo.phoneNo,
    },
  });

  const country = watch("country");

  const onSubmit = (data) => {
    if (data.phoneNo.length !== 10) {
      notifyError("Phone Number should be 10 digits long");
      return;
    }
    dispatch(saveShippingInfoToStore(data));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <div className=" bg-purple-50">
        <CheckoutSteps activeStep={0} />

        <div className="flex justify-center items-center h-full py-10">
          <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8 square-form">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">
              Shipping Details
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center space-x-4">
                <HomeIcon className="text-purple-500" />
                <input
                  required
                  type="text"
                  placeholder="Address"
                  {...register("address", { required: true })}
                  className="form-input w-full border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.address && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <LocationCityIcon className="text-purple-500" />
                <input
                  required
                  type="text"
                  placeholder="City"
                  {...register("city", { required: true })}
                  className="form-input w-full border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.city && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <PinDropIcon className="text-purple-500" />
                <input
                  required
                  type="number"
                  placeholder="Pin Code"
                  {...register("pinCode", { required: true })}
                  className="form-input w-full border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.pinCode && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <PhoneIcon className="text-purple-500" />
                <input
                  required
                  type="number"
                  placeholder="Phone Number"
                  {...register("phoneNo", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                  className="form-input w-full border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.phoneNo && (
                  <span className="text-red-500">
                    Phone Number should be 10 digits long
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <PublicIcon className="text-purple-500" />
                <select
                  {...register("country", { required: true })}
                  className="form-input w-full border-gray-300 rounded-md shadow-sm p-2 text-black"
                >
                  <option className="text-gray-500" value="">
                    Country
                  </option>
                  {Country.getAllCountries().map((item) => (
                    <option
                      className="text-gray-500"
                      key={item.isoCode}
                      value={item.isoCode}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {country && (
                <div className="flex items-center space-x-4">
                  <TransferWithinAStationIcon className="text-purple-500" />
                  <select
                    {...register("state", { required: true })}
                    className="form-input w-full border-gray-300 rounded-md shadow-sm p-2  text-black"
                  >
                    <option value="" className="text-gray-500">
                      State
                    </option>
                    {State.getStatesOfCountry(country).map((item) => (
                      <option className="text-gray-500" key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              )}

              <input
                required
                type="submit"
                value="Continue"
                className="w-full py-2 px-4 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 transition duration-300"
                disabled={!country}
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
