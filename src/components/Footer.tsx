export default function Footer() {
  const now = new Date();
  const year = now.getFullYear();
  return (
    <div className="w-full bg-neutral-900 border-t border-neutral-800">
      <div className="container max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-5">
        <div className="w-full py-10">
          <div className="w-full flex items-center justify-center">
            <p className="text-neutral-300 text-md text-center">
              &copy; {year} Copyright RelzHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
