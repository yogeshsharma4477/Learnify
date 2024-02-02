import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CourseCard({ title, description, price, imageLink }){
    return (
        <Card sx={{ minWidth: 400, maxWidth: 400, m: 2 }} >
            <CardMedia
                sx={{ height: 180 }}
                image={imageLink}
                title="card img"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                    <Box sx={{ fontWeight: 'bold', mt: 1 }}>₹{price}</Box>
                </Typography>

            </CardContent>
            <CardActions>
                <Button variant='contained'> Buy Course </Button>
            </CardActions>
        </Card>
    );
}
