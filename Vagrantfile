# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/wily64"
  config.vm.network "forwarded_port", guest: 80, host: 5000

  is_windows = (RbConfig::CONFIG['host_os'] =~ /mswin|mingw|cygwin/)

  if is_windows
    # Provisioning configuration for shell script.
    config.vm.provision "shell" do |sh|
      sh.path = "deploy/setup_windows.sh"
    end
  else
    config.vm.provision "ansible" do |ansible|
      ansible.inventory_path = "deploy/hosts"
      ansible.playbook = "deploy/setup_server.yml"
      ansible.verbose = "extra"
      ansible.limit = 'all'
    end
  end

end
