interface LoginResource {
  data: Partial<{
    type: "users";
    attributes: {
      email: string;
      password: string;
    };
    meta: {
      device_name: string;
    };
  }>;
}
