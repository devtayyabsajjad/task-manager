import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Task Manager
      </Typography>
      <Typography variant="h5" component="h2" color="primary">
        Application Loading Successfully!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        If you can see this message, the React app is working.
      </Typography>
    </Box>
  );
}

export default App;
