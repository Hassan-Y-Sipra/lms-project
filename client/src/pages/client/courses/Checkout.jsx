import React, { useState, useEffect } from "react";
import axios from "axios";
import moduleImg from "../../../assets/images/moduleimg.png";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SBqqTBhtyNdp9sOxCg8dVsGjRd0fxEQJ8FgMFcrjXdQUrtJYsvgVB5iTD3cwDolubMIUlrlvBc2KivB69MS5YSq005JGscHk6"
); // tumhara Publishable key

const Checkout = () => {
  const [course, setCourse] = useState([]);
  const URL = import.meta.env.VITE_URL;
  const { id } = useParams();

  const getCourse = () => {
    axios
      .get(`${URL}/course/${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCourse();
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const stripe = await stripePromise;

      const formData = {
        name: e.target[0].value,
        email: e.target[1].value,
        phone: e.target[2].value,
        zipcode: e.target[3].value,
        state: e.target[4].value,
      };

      const response = await axios.post(
        "http://localhost:7000/create-checkout-session",
        formData
      );
      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <div className=" mx-auto grid md:grid-cols-2 gap-10">
          {/* Left side: Course info */}
          <div className=" w-full pl-60 bg-white rounded-2xl p-6 space-y-6">
            <div className="">
              {course.map((item) => (
                <div key={item.id}>
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                </div>
              ))}
              <span className="text-gray-500">By Valuda's Tech Park</span>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-amber-500">₹5399</h3>
            </div>

            <div className="space-y-4">
              <img
                src={moduleImg}
                alt="Course"
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />

              <div className="text-gray-600 space-y-2">
                <p className="font-medium">
                  36 lessons | 2.5 Hours of Content | Lifetime Access | Watch
                  anytime, as many times
                </p>
                <p>
                  Take your productivity to the next level while maximizing your
                  happiness and life satisfaction. Fully updated with worksheets
                  and now available in Hindi with English subtitles. Learn to
                  plan your day, track time, achieve goals, and live your dream
                  life.
                </p>
                <p>
                  Users from Pakistan, Bangladesh, Nepal and Sri Lanka can
                  purchase using this link:
                </p>
                <a
                  href="https://academy.dhruvrathee.com/l/9d6d43de2e"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-500 "
                >
                  https://academy.dhruvrathee.com/l/9d6d43de2e
                </a>
              </div>
            </div>
          </div>

          {/* Right side: Payment form */}
          <div className="max-w-full h-screen bg-gray-100 py-6 pl-10">
            <div className="mt-1 pl-6">
              <h3 className="text-xl font-bold text-gray-800">
                Payment Details
              </h3>
              <p className="text-gray-500 ">
                Complete your purchase by providing your payment details.
              </p>
            </div>
            <div className="pl-7">
              <form
                className="w-[440px] pl-10 bg-white shadow-sm p-6 space-y-6 mt-17"
                onSubmit={handlePayment}
              >
                <span className="block font-medium text-gray-700">
                  Billing Information
                </span>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Zipcode"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  defaultValue="Gujarat"
                  required
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  {/* baki states */}
                </select>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Proceed to Pay ₹5399
                </button>
                


              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
