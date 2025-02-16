#!/bin/sh
# Author: DoraCloud Technology Ltd.co
#
# Date: 2022/05/07
#
# Install NVIDIA Linux vGPU Driver 535.129.03
# echo ""
# echo "********************************************************"
# echo "*** Install NVIDIA Grid vGPU Driver 16.2 V535.129.03 ***"
# echo "********************************************************"

#echo " Downloading NVIDIA driver "
#wget http://www1.deskpool.com:9000/software/NVIDIA-Linux-x86_64-535.129.03-vgpu-kvm.run
chmod +x NVIDIA-Linux-x86_64-535.129.03-vgpu-kvm.run


# echo ""
# echo " Extracting driver .... "
./NVIDIA-Linux-x86_64-535.129.03-vgpu-kvm.run -x

cd NVIDIA-Linux-x86_64-535.129.03-vgpu-kvm/


# echo ""
# echo " Installing driver .... "
./nvidia-installer -dkms -s

# echo ""
# echo " deamon-reload && rebooting ...."
systemctl daemon-reload
reboot