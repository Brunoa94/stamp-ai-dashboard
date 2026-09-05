import bcrypt from "bcrypt";

const saltRounds = 10;

const encrypt = async ({ password }: { password: string }): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

const decrypt = async ({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const Bcrypt = { encrypt, decrypt };
