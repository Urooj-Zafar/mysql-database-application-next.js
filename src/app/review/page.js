"use client";

import { useEffect, useState } from "react";

export default function ReviewPage() {
  const [form, setForm] = useState({
    user_id: "",
    product_id: "",
    rating: "",
    comment: ""
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fetchReviews = async () => {
    setLoading(true);

    const res = await fetch("/api/catalog/reviews");
    const data = await res.json();

    console.log("API RESPONSE:", data);

    if (data.success) {
      setReviews(data.reviews);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/catalog/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      setForm({
        user_id: "",
        product_id: "",
        rating: "",
        comment: ""
      });

      fetchReviews();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">

      <h1 className="text-4xl font-extrabold text-center mb-8">
        Review Management
      </h1>


<form
  onSubmit={handleSubmit}
  className="w-full max-w-md bg-white p-8 rounded-2xl space-y-4 mx-auto mb-10
             shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
>

  <h1 className="text-3xl font-bold text-center mb-8">
    Add Review
  </h1>

  <input
    name="user_id"
    placeholder="USER ID"
    value={form.user_id}
    onChange={handleChange}
    className="w-full p-3 rounded-xl bg-gray-50 outline-none
               shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
               focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
  />

  <input
    name="product_id"
    placeholder="PRODUCT ID"
    value={form.product_id}
    onChange={handleChange}
    className="w-full p-3 rounded-xl bg-gray-50 outline-none
               shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
               focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
  />

  <input
    name="rating"
    placeholder="RATING"
    value={form.rating}
    onChange={handleChange}
    className="w-full p-3 rounded-xl bg-gray-50 outline-none
               shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
               focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
  />

  <textarea
    name="comment"
    placeholder="COMMENT"
    value={form.comment}
    onChange={handleChange}
    rows={4}
    className="w-full p-3 rounded-xl bg-gray-50 outline-none resize-none
               shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
               focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
  />

  <button
    type="submit"
    className="w-full bg-black text-white p-3 rounded-xl
               hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
               transition"
  >
    Submit Review
  </button>

</form>

<div
  className="bg-white rounded-2xl p-6
             shadow-[0_20px_50px_rgba(0,0,0,0.08)]
             overflow-x-auto"
>

  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold">
      All Reviews
    </h2>

    <span className="text-sm text-gray-500">
      Total: {reviews.length}
    </span>
  </div>

  {loading ? (
    <div className="py-10 text-center text-gray-500">
      Loading reviews...
    </div>
  ) : reviews.length === 0 ? (
    <div className="py-10 text-center text-gray-500">
      No reviews found
    </div>
  ) : (
    <table className="w-full border-separate border-spacing-y-3">

      <thead>
        <tr className="text-left text-gray-500 text-sm">

          <th className="px-4">ID</th>
          <th className="px-4">USER</th>
          <th className="px-4">PRODUCT</th>
          <th className="px-4">RATING</th>
          <th className="px-4">COMMENT</th>
          <th className="px-4">DATE</th>

        </tr>
      </thead>

      <tbody>
        {reviews.map((r) => (
          <tr
            key={r.review_id}
            className="bg-gray-50 hover:bg-white transition
                       shadow-[0_5px_20px_rgba(0,0,0,0.05)]
                       rounded-xl"
          >

            <td className="p-4 rounded-l-xl font-semibold">
              #{r.review_id}
            </td>

            <td className="p-4">
              {r.user_id}
            </td>

            <td className="p-4">
              {r.product_id}
            </td>

            <td className="p-4">
              <span
                className="bg-black text-white px-3 py-1 rounded-full text-sm"
              >
                {r.rating} ★
              </span>
            </td>

            <td className="p-4 max-w-[250px] truncate">
              {r.comment}
            </td>

            <td className="p-4 rounded-r-xl text-gray-500 text-sm">
              {r.review_date}
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  )}

</div>

    </div>
  );
}