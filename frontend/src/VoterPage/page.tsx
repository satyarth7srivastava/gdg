export default function VoterPage() {
    const candidates = ['Candidate A', 'Candidate B', 'Candidate C'];
  
    return (
      <div className="p-6 bg-lime-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Vote for a Candidate</h2>
          <ul className="space-y-2">
            {candidates.map((candidate, index) => (
              <li key={index} className="flex justify-between p-4 bg-yellow-50 rounded-lg shadow-sm">
                <span>{candidate}</span>
                <input type="radio" name="vote" value={candidate} />
              </li>
            ))}
          </ul>
          <button className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mt-4">Confirm Vote</button>
        </div>
      </div>
    );
  }