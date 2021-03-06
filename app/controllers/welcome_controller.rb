class WelcomeController < ApplicationController
  def index
  end

  def search
    user, repo = params[:repo].to_s.split('/')
    if user.present? && repo.present?
      redirect_to repo_path(user, repo)
    else
      flash[:danger] = "Is that even a repository? Try again."
      render :index
    end
  end
end
