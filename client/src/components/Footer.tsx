interface FooterProps {
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full bg-slate-100 px-4 py-4 lg:py-6">
      <div className="mx-auto flex h-full max-h-[70px] w-full max-w-screen-lg flex-col items-center justify-center gap-1">
        <span className="text-sm text-slate-500">Made with ❤️ by Joaquin Galoppo</span>
        <span className="text-sm text-slate-500">
          © 2023 -{' '}
          <a className="underline underline-offset-2" href="http://joagaloppo.com/">
            joagaloppo.com
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
