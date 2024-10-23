export default function Signup() {
    return (
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full rounded-md border-black-200 border bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2 "
              />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-black-200 border bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2 "
              />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-black-200 border bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2 "
              />
          </div>
          <button
            type="submit"
            className="w-full bg-customPink hover:bg-red-400 text-black font-extrabold py-2 px-4 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    )
  }