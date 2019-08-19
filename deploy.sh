echo "Starting deployment"
echo "  Building..."

if [ $1 = 'prod' ]; then
  echo "  >  Production Build"
  ng build --configuration=production --no-progress
elif [ $1 = 'dev' ]; then
  ng build --configuration=dev --no-progress
fi

echo "  Deploying archive"
scp -r dist/cheryl-client pi@192.168.178.25:/home/pi/static/
