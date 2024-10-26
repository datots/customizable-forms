const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 p-4 text-center">
      <p className="text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} My Web Application. All rights
        reserved.
      </p>
      <div className="mt-2">
        <a href="/terms" className="mr-4">
          Terms of Service
        </a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
