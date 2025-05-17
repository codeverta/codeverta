import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Script from "next/script";
import api from "utils/api";
import GoogleCaptcha from "./GoogleCaptcha";
import LoadingBackdrop from "components/mui/LoadingBackdrop";

export default function Login() {
  const router = useRouter();
  const [loaded, setIsLoaded] = useState(false);
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [state, setState] = useState<{
    email: string;
    password: string;
    isCaptchaSolved: boolean;
  }>({
    email: "",
    password: "",
    isCaptchaSolved: true,
  });

  const loginMutation = useMutation({
    mutationFn: (state: LoginResource) => {
      return api.post("/auth/login", state);
    },
  });

  const onSuccessCaptcha = () => {
    setIsCaptchaSolved(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (!isCaptchaSolved) {
    //   toast.error("Isi captcha dulu");
    //   return;
    // }
    event.preventDefault();
    const payload: LoginResource = {
      data: {
        type: "users",
        attributes: state,
        meta: {
          device_name: navigator.userAgent,
        },
      },
    };

    loginMutation.mutate(payload, {
      onSuccess(data) {
        toast.success("Login berhasil");
        localStorage.setItem("token", data.data.token);
        if (data.data.roles.includes("merchant")) {
          router.push("/admin");
        } else if (data.data.roles.includes("buyer")) {
          router.push("/store");
        } else {
          console.error("role tidak ditemukan");
        }
      },
      onError(data: any) {
        data.response.data.errors.forEach(
          (error: { detail: string; status: string }) => {
            toast.error(error.detail);
          }
        );
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 600);
  }, []);

  if (!loaded) {
    return (
      <>
        <LoadingBackdrop />
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="lazyOnload"
        />
      </>
    );
  }

  return (
    <>
      <section>
        <div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:min-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 max-w-lg space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={state.password}
                    onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="on"
                    placeholder="Masukkan Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                  />
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </a>
                <GoogleCaptcha onSuccess={onSuccessCaptcha} />
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
