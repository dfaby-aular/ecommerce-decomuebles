const Loading = () => {
  return (
    <>
      <div style={{ margin: '100px 0px 30px 0px', justifyContent: 'center', display: 'flex' }}>
        <div style={{ position: 'absolute', marginTop: 35, fontSize: '12px', color: '#939393' }}>Cargando...</div>
        <div
          style={{
            width: '90px',
            height: '90px',
            border: '5px solid rgb(199, 199, 199)',
            borderTop: '5px solid rgba(0, 0, 0, 0)',
            borderBottom: '5px solid rgba(0, 0, 0, 0)',
            borderRadius: '50%',
            animation: 'spin 0.9s linear infinite'
          }}
        >
        </div>
      </div>
    </>
  )
}

export default Loading;