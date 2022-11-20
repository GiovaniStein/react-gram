import Message from "./Message"

const Submit = ({loading, error, value = 'Cadastrar'}) => {
  return (
    <>
        {!loading && <input type="submit" value={value} />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
    </>
  )
}

export default Submit