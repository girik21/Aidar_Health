export default function Login() {
  return (
    <div className="bg-formShade shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-800 text-white py-2 px-4 rounded-2xl text-xl font-bold"
        >
          Login
        </button>
      </form>
    </div>
  )
}
