class ReposController < ApplicationController
  # TODO: before_filter

  def index
    repo = GithubRepo.fetch(params[:username], params[:repo])

    @repositories = repo.rated_forks
  end
end
