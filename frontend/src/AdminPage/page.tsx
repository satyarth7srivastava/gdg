export default function AdminPage() {
    return (
      <div className="p-6 bg-lime-100 min-h-screen flex justify-center items-center">
        <form className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Add Party Candidate</h2>
          <input type="text" placeholder="Candidate Name" className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="text" placeholder="Party Name" className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="date" className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <button className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Submit</button>
        </form>
      </div>
    );
  }