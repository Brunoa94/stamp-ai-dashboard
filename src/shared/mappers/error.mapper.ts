type ErrorStatus = 500 | 200 | 401;

type CreateErrorType = {
  status: ErrorStatus;
  message: {
    service: string;
    description: string;
  };
};

const Create = ({
  status,
  service,
  description,
}: {
  status: ErrorStatus;
  service: string;
  description: string;
}): CreateErrorType => ({
  status,
  message: {
    service,
    description,
  },
});

export const ErrorMapper = { Create };
