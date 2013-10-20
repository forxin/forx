class ReposController < ApplicationController
  rescue_from Octokit::NotFound, with: :repo_not_found

  def index
    repo = GithubRepo.fetch(params[:username], params[:repo])

    @repositories = repo.rated_forks
  end

  private
  def repo_not_found
    redirect_to root_url, flash: { danger: "We didn't find a repository with that name out there :(" }
  end
end
