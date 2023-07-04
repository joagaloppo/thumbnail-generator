const Links: React.FC = () => {
  return (
    <ul className="flex justify-center gap-4 text-sm font-medium text-gray-800">
      <li>
        <a href="https://github.com/joagaloppo" target="_blank" className="underline-offset-2 hover:underline">
          About
        </a>
      </li>
      <li>
        <a href="mailto:joaquingaloppo@gmail.com" target="_blank" className="underline-offset-2 hover:underline">
          Contact
        </a>
      </li>
    </ul>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto flex min-h-[60px] w-full max-w-screen-md items-center justify-between p-4 py-0 text-center">
        <span className="text-sm text-gray-800">© 2023 - Thumby</span>
        <Links />
      </div>
    </footer>
  );
};

export default Footer;
