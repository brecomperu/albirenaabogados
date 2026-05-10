module "cloud_run" {
  source       = "./modules/cloud-run"
  project_id   = var.project_id
  region       = var.region
  service_name = var.service_name
  image        = var.image
}

module "iam" {
  source     = "./modules/iam"
  project_id = var.project_id
}
