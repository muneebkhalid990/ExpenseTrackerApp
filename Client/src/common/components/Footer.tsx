

function Footer() {
  return (
    <div className="bg-teal-500 py-1">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white tracking-tight">
          Expense Tracker
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
}

export default Footer;
