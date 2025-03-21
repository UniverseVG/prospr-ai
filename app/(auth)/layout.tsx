import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex items-center justify-center bg-transparent p-6 pt-20 overflow-x-hidden min-h-screen">
      <div className="absolute inset-0 grid-background z-[-1]" />

      <div className="p-1 mx-4 rounded-3xl bg-gradient-to-r from-primary to-secondary relative z-10">
        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden w-full max-w-lg md:max-w-6xl border border-border">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center p-4 md:w-1/2 bg-popover order-1 md:order-2">
              {children}
            </div>
            <div className="relative md:w-1/2 h-64 md:h-auto order-2 md:order-1">
              <Image
                src="/auth.png"
                alt="Futuristic AI and Businessman"
                width={500}
                height={500}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-primary/30 mix-blend-multiply animate-fadeIn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
