class WelcomeController < ApplicationController
  def index
  end

  def search
    user, repo = params[:repo].to_s.split('/')
    if user.present? && repo.present?
      redirect_to repo_path(user, repo)
    else
      flash[:danger] = "You cannot forx a repository with that name!"
      render :index
    end
  end
end
