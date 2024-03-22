export function Navbar() {
  return (
    <header className="h-[6%] bg-red-500 px-6 flex items-center">
      <p className="mr-auto">Movie Date</p>

      <form className="flex ">
        <input
          type="text"
          className="text-[#343434] text-sm rounded-md focus:ring-[#6146D8] focus:border-[#6146D8] block w-full p-2.5 mr-4"
          placeholder="Barbie"
        />
        <button
          type="submit"
          className="bg-[#735CDD] md:hover:bg-[#6146D8] md:transition-colors md:ease-in-out md:duration-200 font-bold py-2 px-4 rounded-md"
        >
          Recherchez
        </button>
      </form>
    </header>
  )
}
