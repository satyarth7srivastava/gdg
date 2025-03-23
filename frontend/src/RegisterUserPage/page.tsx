export default function RegisterUserPage() {
    return (
      <div className="p-6 bg-lime-100 min-h-screen flex justify-center items-center">
        <form className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          <input type="text" placeholder="ID" className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="password" placeholder="Password" className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="password" placeholder="Confirm Password" className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <select className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <option value="admin">Admin</option>
            <option value="voter">Voter</option>
          </select>
          <button className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Register</button>
        </form>
      </div>
    );
  }