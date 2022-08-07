export const updateHandler = async (entered) => {
    try {
      const { uuid, form } = entered;
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_HOST_URL
        }/api/updateCard/?uuid=${encodeURIComponent(uuid)}`,
        {
          method: "PATCH",
          body: form,
        }
      );
      const data = await res.json();
    } catch (error) {
      console.error(error.message);
    }
};