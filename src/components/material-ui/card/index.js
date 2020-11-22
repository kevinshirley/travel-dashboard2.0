import React from 'react';
import cx from 'classnames';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { OPEN_IN_NEW_ICON, CODE_ICON } from 'src/components/material-ui/icons';

export default function ImgMediaCard(props) {
  const { 
    title, 
    description, 
    image, 
    isModal, 
    isCard, 
    openModal,
    projectUrl,
    codeUrl,
  } = props;

  const cardClasses = cx({
    'card': isCard,
    'card-width': isCard,
    'modal': isModal,
    'modal-width': isModal,
  });

  return (
    <Card className={cardClasses}>
      <CardActionArea onClick={openModal}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {isCard ? (
              <div className="project">
                <span className="label">Project</span>
                <br></br>
                <span>{description}</span>
              </div>
            ) : (
              <>
                <div className="project">
                  <span className="label">Project</span>
                  <br></br>
                  <span>{description}</span>
                </div>
                <div className="tech-stack">
                  <span className="label">Tech Stack</span>
                  <br></br>
                  <span>{description}</span>
                </div>
              </>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isCard && (
          <Button 
            size="small"
            className="card-cta"
            color="primary" 
            onClick={openModal}
          >
            Details
          </Button>
        )}
        {isModal && (
          <>
            <Button 
              size="small"
              color="primary"
            >
              <a href={projectUrl} target="_blank">{OPEN_IN_NEW_ICON}&ensp;&ensp;Visit Project</a>
            </Button>
            <Button 
              size="small"
              color="primary"
            >
              <a href={codeUrl} target="_blank">{CODE_ICON}&ensp;&ensp;View Code</a>
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}